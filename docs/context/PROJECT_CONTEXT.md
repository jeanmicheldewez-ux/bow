# BOW Project Context

BOW means Body Orchestra Workstation.

BOW is a modular creative AI runtime/workstation for routing models, MIDI, body tracking, audio analysis, visualizers and live performance data.

The goal is to create reusable modules that can later work inside several projects:
- WATTOO
- Midiboy
- Dancing5
- Supersets
- Tone.js sound engine
- ESP32 MIDI controllers
- physical puppet/stepper motor systems

## Related projects

### Supersets

Supersets is a commercial Electron MIDI application.

It generates and morphs MIDI CC presets for musicians. It also explores the idea of learning user taste from random preset exploration.

For BOW, Supersets is only a use case:
- input: MIDI CC values, motion parameters, preset parameters
- output: user preference score, liked/disliked presets, guided preset suggestions
- goal: learn from user taste and route MIDI-like data

Do not copy production Supersets code.

### Dancing5

Dancing5 is a creative AI project for generating dancer models.

It should support:
- audio features
- MIDI music features
- MediaPipe body landmarks
- normalized skeletons
- joint angles
- avatar/rig-friendly output later

For BOW, Dancing5 is a model and visualization use case:
- input: audio/MIDI/body data
- output: dancer motion, skeleton values, avatar control values
- goal: train/export dancer models and reuse them in visual/live systems

Important future pipeline:
MediaPipe landmarks → normalized skeleton → bone vectors → joint angles/quaternions → avatar rig mapping.

### Midiboy

Midiboy detects body movement and position from a webcam, displays an avatar, and triggers MIDI when the avatar touches or moves through areas drawn on a canvas.

Future idea:
A neural model could take:
- MIDI music
- audio music features
- user dance/body movement

And output:
- dynamic MIDI trigger zones
- zone positions
- zone sizes
- zone MIDI mappings
- zone lifetime/stability

The zones should be dynamic but musically stable, not chaotic.

### WATTOO

WATTOO is a live interactive audiovisual installation runtime.

It uses sensors, body tracking, MIDI and visual effects across multiple machines/projectors.

For BOW:
- WATTOO can later consume BOW modules
- WATTOO can use BOW visualizers
- WATTOO can load exported graphs/models
- BOW can provide multi-screen/projector display logic later

### Tone.js Sound Engine

The Tone.js sound engine is a browser sound engine with synths, effects and presets.

For BOW:
- it can receive normalized values
- it can map model outputs to synth/effect parameters
- it can be controlled by MIDI/body/audio/model data

### ESP32 MIDI Controller

The ESP32 ultrasonic MIDI controller is a hardware gesture controller.

For BOW:
- it can become an input transport
- it can send MIDI/control data
- it can later control visualizers, synths, models or puppet outputs

### Physical Puppet

Future idea:
BOW can route model outputs to a physical puppet controlled by 5 stepper motors.

Possible outputs:
- head
- left arm
- right arm
- torso
- legs/global lift

Important:
Motor output must use safety constraints:
- min/max position
- speed limit
- acceleration limit
- calibration
- emergency stop
- home position

## Core BOW principle

BOW internal data should use normalized float values.

Examples:
- 0.0 to 1.0 for normal controls
- -1.0 to 1.0 for signed movement
- MIDI 0 to 127 is converted only at the adapter edge

BOW should support artistic mapping even when data sizes do not match.

Example:
- one model outputs 16 values
- another visualizer expects 24 values

BOW should still allow:
- map by label
- map by index
- repeat values
- truncate values
- fill missing values
- random fill
- previous-frame fill
- smoothing
- normalization

## Module types

BOW should support portable modules:

- visualizer modules
- transport modules
- model modules
- mapper modules
- controller modules

Every module should declare:
- id
- name
- type
- inputs
- outputs
- params
- setup optional
- process/render function
- cleanup optional

## First version goal

For v0.1, do not build everything.

Focus on:
- data packet format
- module format
- graph format
- Creative Mapper
- MIDI-like simulator
- mock model outputting 16 values
- visualizer expecting 24 values
- control UI
- display UI
- graph JSON export
- clear documentation

No backend.
No login.
No real cloud upload.
No real production code from other projects.