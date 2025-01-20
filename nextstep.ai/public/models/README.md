# 3D Models Directory

This directory contains the 3D models used in the application.

## Required Models:

1. `avatar.glb` - The main chatbot avatar model
   - Format: GLB (GL Binary)
   - Required animations:
     - Idle animation (index 0)
     - Talking animation (index 1)

You can use any humanoid 3D model that includes these basic animations. Some recommended sources:
- [Ready Player Me](https://readyplayer.me/) - Create custom avatars
- [Mixamo](https://www.mixamo.com/) - Free 3D characters and animations
- [Sketchfab](https://sketchfab.com/) - Many free and paid 3D models

## Model Requirements:
- File format: GLB
- Poly count: Optimized for web (recommended under 50k triangles)
- Textures: Compressed and optimized for web
- Animations: Must include at least idle and talking animations
- Size: Keep the file size under 5MB for optimal loading

## Adding New Models:
1. Export the model in GLB format
2. Include required animations
3. Place the file in this directory
4. Update the model path in the ChatbotWindow component
