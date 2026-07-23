import os
from PIL import Image, ImageDraw, ImageFilter

def process_images():
    logo_path = 'public/newlogo.png'
    if not os.path.exists(logo_path):
        print("Logo path not found!")
        return

    logo_orig = Image.open(logo_path).convert('RGBA')

    images_dir = 'public/images'
    target_files = [
        'hero_klima.jpg',
        'hero_camasir.jpg',
        'hero_bulasik.jpg',
        'hero_buzdolabi.jpg',
        'hero_kombi.jpg',
        'hero_kurutma.jpg',
        'hero_evaletleri.jpg',
        'hero_klima_montaj.jpg',
        'about_service_team.jpg',
        'customer_satisfaction.jpg',
        'about_us_workshop.jpg'
    ]

    for fname in target_files:
        fpath = os.path.join(images_dir, fname)
        if not os.path.exists(fpath):
            print(f"File not found: {fpath}")
            continue

        base_img = Image.open(fpath).convert('RGBA')
        bw, bh = base_img.size

        # Determine logo overlay dimensions
        # Target logo width ~ 22% of base image width
        target_logo_w = int(bw * 0.22)
        aspect = logo_orig.height / logo_orig.width
        target_logo_h = int(target_logo_w * aspect)

        logo_resized = logo_orig.resize((target_logo_w, target_logo_h), Image.Resampling.LANCZOS)

        # Create sleek dark glassmorphic badge container
        pad = int(bw * 0.015)
        badge_w = target_logo_w + (pad * 2)
        badge_h = target_logo_h + (pad * 2)

        badge = Image.new('RGBA', (badge_w, badge_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(badge)

        # Draw rounded rectangle glass badge with dark background and sky blue border
        corner_radius = int(badge_h * 0.2)
        draw.rounded_rectangle([0, 0, badge_w - 1, badge_h - 1], radius=corner_radius, fill=(15, 23, 42, 195), outline=(14, 165, 233, 160), width=2)

        # Paste logo into badge
        badge.paste(logo_resized, (pad, pad), logo_resized)

        # Position badge in TOP-LEFT corner with margin
        margin_x = int(bw * 0.03)
        margin_y = int(bh * 0.03)
        pos = (margin_x, margin_y)

        # Combine base_img and badge
        combined = Image.new('RGBA', base_img.size)
        combined.paste(base_img, (0, 0))
        combined.paste(badge, pos, badge)

        # Convert back to RGB and save high quality JPEG
        final_jpg = combined.convert('RGB')
        final_jpg.save(fpath, 'JPEG', quality=95)
        print(f"Successfully branded {fname} with company logo badge!")

if __name__ == '__main__':
    process_images()
