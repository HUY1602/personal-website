# Meadow artwork

Created with the built-in `image_gen` tool, using the user-supplied
`Gemini_Generated_Image_aphkyaaphkyaaphk.png` as the visual reference.
No API/CLI fallback was used. Landscapes were exported to same-size JPEG at
quality 90 for web delivery; character PNG transparency is preserved.
Original generated PNGs remain in the image tool's output directory.

## Runtime assets

- `countryside.jpg`: full-screen home scene without the original baked-in girl.
- `nova-poses.png`: transparent 2172 × 724 sheet, four equal 543 × 724 cells:
  standing, walking left leg forward, walking right leg forward, reaching.
- `flower-field.jpg`: base flower field/fallback.
- `field-about.jpg`: blue flowers.
- `field-projects.jpg`: mint and emerald flowers.
- `field-skills.jpg`: lavender and violet flowers.
- `field-experience.jpg`: golden yellow flowers.
- `field-contact.jpg`: rose pink flowers.

The door, foreground grass, foreground blooms and pollen are native CSS/SVG.
Sprites use fixed cell proportions, avoiding image stretching. Motion is
disabled by the site preference and by `prefers-reduced-motion`.

## Final prompts

### Home background (edit of user reference)

Use case: precise-object-edit. Create a clean background plate for an animated website from the reference image. Remove ONLY the girl completely, reconstruct the grass and path naturally where she stood. Preserve the exact hand painted anime countryside aesthetic, composition, blue sky, big soft clouds, distant mountains, green hills, wildflowers and winding dirt path from bottom center toward center-right horizon. No people, no doors, no text. Full bleed landscape 16:9 high quality. This will be the full-screen background behind an independently animated girl and door. Save the resulting image as a local file and return its path.

### Character sheet (transparent, user reference)

Use case: identity-preserve. Asset type: transparent character sprite strip for a website. Reference: the attached girl in the countryside. Produce ONE horizontal 4-cell sprite sheet on a TRULY TRANSPARENT background. Each cell exactly one quarter of canvas width, identical scale and baseline, whole head hat shoes fully visible with clear margins, no overlap. Same beautiful young adult anime woman matching reference: long charcoal hair blowing left, straw sunhat brown ribbon, cream blouse, ochre knitted sleeveless vest, flowing pale blue calf-length skirt, brown shoulder bag, brown simple shoes. Natural tall balanced 7-head proportions, NOT chibi, NOT fox ears. Painterly fine linework, detailed warm face. Facing right in three-quarter profile in all four cells. Cell 1: relaxed standing, right hand holding hat, gentle smile. Cell 2: walking right, left foot forward, right foot back, arm swings naturally. Cell 3: walking right, right foot forward, left foot back. Cell 4: standing and reaching forward to the right with right arm at chest level to open a door, hand extended. Consistent character identity and clothing in every cell; feet at exactly same baseline. No scenery, no shadows outside character, no labels, no text, no border. Wide landscape sheet.

### Flower field (user reference for style)

Use case: illustration-story. Asset type: full screen landscape background for inner worlds of a portfolio. Use attached image ONLY as painterly anime countryside style reference. Draw an expansive beautiful flower meadow, rolling green hills and blue distant mountains, huge soft white cumulus clouds in clear bright blue sky, warm summer sunshine. Flowers everywhere in the lower half, delicate white daisies and ivory cosmos with pale green stems, plentiful soft pale blue/lavender flowers. A narrow beige winding footpath leads from bottom center into distance at center. No person, no door, no buildings, no text. Very fine handpainted details in foreground blooms with atmospheric depth. Airy hopeful feeling. Full bleed 16:9 wide composition, horizon at 45 percent height. The low-saturation flowers will be accompanied by colored foreground blossoms in code for five themed worlds.

### Five palette variants (edit of generated flower field)

Each variant used this prompt, substituting `ID` and `PALETTE` below:

Use case: precise-object-edit. Edit target: attached flower field. Create the ID world background. Recolor ONLY all the flower petals throughout the meadow to PALETTE, so this clearly reads as a field of PALETTE flowers. Keep all grass and leaves green, sky blue, clouds white, dirt path beige, and mountain colors exactly unchanged. Preserve composition, handpainted anime rendering, camera and sunlight. Flowers should be plentiful and theme color dominant in foreground. No people, no door, no text. Full bleed wide 16:9.

| ID | PALETTE |
| --- | --- |
| about | powder blue and cornflower blue |
| projects | pale mint green and emerald-tinted ivory |
| skills | lavender and violet |
| experience | warm golden yellow and butter yellow |
| contact | soft rose pink and blush pink |
