import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kvGet, kvSet, isKvEnabled } from '@/lib/kv';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'service_requests.json');

// Helper to get requests
async function getRequestsData(): Promise<any[]> {
  if (isKvEnabled()) {
    const cached = await kvGet('service_requests');
    if (cached && Array.isArray(cached)) {
      return cached;
    }
  }
  
  if (fs.existsSync(dataFilePath)) {
    try {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const requests = JSON.parse(fileData);
      
      // Seed KV if empty
      if (isKvEnabled()) {
        await kvSet('service_requests', requests);
      }
      return requests;
    } catch {
      return [];
    }
  }
  return [];
}

// Helper to save requests
async function saveRequestsData(requests: any[]): Promise<void> {
  if (isKvEnabled()) {
    await kvSet('service_requests', requests);
  }
  
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2), 'utf8');
  } catch (error) {
    console.warn("Could not write requests to local filesystem (read-only):", error);
  }
}

// Read all requests
export async function GET() {
  try {
    const requests = await getRequestsData();
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json({ error: 'Failed to read requests' }, { status: 500 });
  }
}

// Create a new request
export async function POST(request: Request) {
  try {
    const { name, phone, email, serviceType, district, message } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const requests = await getRequestsData();

    const newRequest = {
      id: "req-" + Date.now().toString(),
      name,
      phone,
      email: email || "Belirtilmedi",
      serviceType: serviceType || "Genel Talep",
      district: district || "Belirtilmedi",
      message: message || "Yok",
      date: new Date().toISOString().split('T')[0],
      status: "Pending"
    };

    requests.unshift(newRequest);
    await saveRequestsData(requests);

    return NextResponse.json(newRequest, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}

// Update request status
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const requests = await getRequestsData();

    const index = requests.findIndex((r: { id: string }) => r.id.toString() === id.toString());
    if (index === -1) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    requests[index].status = status;
    await saveRequestsData(requests);

    return NextResponse.json(requests[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

// Delete request
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let requests = await getRequestsData();

    const initialLength = requests.length;
    requests = requests.filter((r: { id: string }) => r.id.toString() !== id.toString());

    if (requests.length === initialLength) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    await saveRequestsData(requests);
    return NextResponse.json({ success: true, message: 'Request deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
