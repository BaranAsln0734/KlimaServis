import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kvGet, kvSet, isKvEnabled } from '@/lib/kv';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

// Helper to get posts (tries KV first, falls back to file)
async function getPostsData(): Promise<any[]> {
  if (isKvEnabled()) {
    const cached = await kvGet('posts');
    if (cached && Array.isArray(cached)) {
      return cached;
    }
  }
  
  if (fs.existsSync(dataFilePath)) {
    try {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const posts = JSON.parse(fileData);
      
      // Seed KV if empty
      if (isKvEnabled()) {
        await kvSet('posts', posts);
      }
      return posts;
    } catch {
      return [];
    }
  }
  return [];
}

// Helper to save posts (writes to KV and file safely)
async function savePostsData(posts: any[]): Promise<void> {
  if (isKvEnabled()) {
    await kvSet('posts', posts);
  }
  
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    // Fail silently in read-only environment like Vercel
    console.warn("Could not write posts to local filesystem (read-only):", error);
  }
}

// Read all posts
export async function GET() {
  try {
    const posts = await getPostsData();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}

// Create a new post
export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    
    if (!newPost.title || !newPost.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const posts = await getPostsData();

    const postToSave = {
      id: Date.now().toString(),
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: newPost.title,
      excerpt: newPost.excerpt || newPost.content.substring(0, 120) + '...',
      content: newPost.content,
      date: newPost.date || new Date().toISOString().split('T')[0],
      imageUrl: newPost.imageUrl || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070',
      images: newPost.images || [],
      videoUrl: newPost.videoUrl || '',
      author: newPost.author || 'Akan Enerji',
      category: newPost.category || 'Genel',
    };

    posts.unshift(postToSave);
    await savePostsData(posts);

    return NextResponse.json(postToSave, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

// Update an existing post
export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json();

    if (!updatedPost.id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    if (!updatedPost.title || !updatedPost.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const posts = await getPostsData();

    const index = posts.findIndex((p: { id: any }) => p.id.toString() === updatedPost.id.toString());
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Update editable fields including date and category
    posts[index] = {
      ...posts[index],
      title: updatedPost.title,
      excerpt: updatedPost.excerpt || updatedPost.content.substring(0, 120) + '...',
      content: updatedPost.content,
      imageUrl: updatedPost.imageUrl || posts[index].imageUrl,
      images: updatedPost.images || posts[index].images || [],
      videoUrl: updatedPost.videoUrl !== undefined ? updatedPost.videoUrl : posts[index].videoUrl || '',
      category: updatedPost.category || 'Genel',
      date: updatedPost.date || posts[index].date || new Date().toISOString().split('T')[0],
    };

    await savePostsData(posts);
    return NextResponse.json(posts[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// Delete a post
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    let posts = await getPostsData();

    const initialLength = posts.length;
    posts = posts.filter((post: { id: any }) => post.id.toString() !== id.toString());

    if (posts.length === initialLength) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await savePostsData(posts);
    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
