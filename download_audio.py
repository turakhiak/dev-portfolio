import urllib.request
import os

files = {
    "west_end_blues.mp3": "https://archive.org/download/LouisArmstrongAndHisHotFive-WestEndBlues/LouisArmstrongAndHisHotFive-WestEndBlues.mp3",
    "potato_head_blues.mp3": "https://archive.org/download/TheGeniusOfLouisArmstrongVolume11923-1933/12_Potato_Head_Blues.mp3",
    "muskrat_ramble.mp3": "https://archive.org/download/TheGeniusOfLouisArmstrongVolume11923-1933/08_Muskrat_Ramble.mp3"
}

output_dir = "assets/audio"
os.makedirs(output_dir, exist_ok=True)

for filename, url in files.items():
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, os.path.join(output_dir, filename))
        size = os.path.getsize(os.path.join(output_dir, filename))
        print(f"Success: {filename} ({size} bytes)")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
