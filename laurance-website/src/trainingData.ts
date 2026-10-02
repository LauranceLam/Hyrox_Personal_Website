// src/trainingData.ts

export interface Session {
  time: string;
  title: string;
  details: string[];
}

export interface TrainingDay {
  day: string;
  sessions: Session[];
}

export interface WeekData {
  week: number;
  phase: number;
  days: TrainingDay[];
}

export interface Phase {
  id: number;
  name: string;
  weeks: string;
  description: string;
}

export const phases: Phase[] = [
  { 
    id: 1, 
    name: 'Phase 1: Build Engine & Heavy Pro Base', 
    weeks: 'Weeks 1-6 From 2026-09-06 to 2026-10-17', 
    description: 'Focus on building Pro-level strength capacity, foundational aerobic volume, and fixing Sled and Burpee movement efficiency.' 
  },
  { 
    id: 2, 
    name: 'Phase 2: Raise Your Pace & Target Weakness Fixes', 
    weeks: 'Weeks 7-10 From 2026-10-18 to 2026-11-21', 
    description: 'Shift focus toward race-pace compromised running, high-volume station fatigue, and cutting down transition (Roxzone) delays.' 
  },
  { 
    id: 3, 
    name: 'Phase 3: Race Ready & Sanya Pro Taper', 
    weeks: 'Weeks 11-13 From 2026-11-22 to 2026-12-06', 
    description: 'Reduce training volume while keeping movement intensity high to sharpen the central nervous system and achieve peak race freshness.' 
  }
];

export const allWeeks: WeekData[] = [
  // Phase 1: Weeks 1-6
  {
    week: 1,
    phase: 1,
    days: [
      {
        day: 'Monday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Pro Lower Strength & Burpee Efficiency',
            details: [
              'Warm-Up (10m): Dynamic hip mobility, single-leg glute bridges, ankle dorsiflexion',
              'Heavy Back Squats (25m): 4 sets x 5 reps @ 80–85% 1RM. Rest 2–3 mins',
              'Burpee Broad Jump Rhythm Drills (25m): 5 sets x 100m using "Step-In" method. Focus on strict 1-breath rhythm',
              'Core & Posture (10m): 3 sets x 45s Heavy Farmer\'s Carry + 12 Hanging Knee Raises',
              'Cooldown (5m): Gentle hamstring and quad release'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Threshold Running & Posterior Mobility',
            details: [
              'Warm-Up (10m): 1km light jog + dynamic drills',
              'Threshold Run (55m): 4 x 2km @ Target Threshold Pace (~4:30/km). 2 mins easy jog recovery',
              'Cooldown & Mobility (25m): 10m light jog + 15m deep stretching'
            ]
          }
        ]
      },
      {
        day: 'Tuesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Aerobic Base Run',
            details: [
              '45–60 Mins continuous Zone 2 run',
              'Strict conversational pace / 100% nasal breathing (<140 bpm)',
              'Flat ground',
              'Cooldown: 10 Mins ankle mobility and calf stretching'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Wednesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Pro Sled Pull & Upper Pull Power',
            details: [
              'Warm-Up (10m): Thoracic rotations, glute bridges, band pull-aparts',
              'Pro Sled Pull Adaptation (25m): 4 sets x 20m Heavy Sled Pull or Backward Sled Drag (100kg–125kg). Rest 90s',
              'SkiErg / Assault Bike Intervals (20m): 5 x 500m SkiErg (@ 1:50–1:55/500m) OR 5 x 12–15 Cal Assault Bike',
              'Upper Pull & Core (15m): 3 x 8–10 Neutral-Grip Lat Pulldowns + 3 x 12/side Pallof Press',
              'Cooldown (5m): Lat and hamstring static stretches'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Thursday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Pro Sled Push & Erg Power',
            details: [
              'Warm-Up (10m): Light Row + Soleus wall stretches + glute activation',
              'Pro Sled Push Mechanics (25m): 4 sets x 20m Sled Push (175kg Pro load) OR Dead Treadmill Push (4 x 45s)',
              'Row Erg Intervals (20m): 4 x 750m Row @ 1:52–1:56/500m pace. Rest 75s',
              'Core Finisher (10m): 3 sets x 12 Heavy Cable Woodchoppers or Plank Holds',
              'Cooldown (10m): Standing quad and hamstring stretches'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Aerobic Base Run & Deep Mobility',
            details: [
              'Run (60m): Zone 2 Easy Run (Strict <140 bpm)',
              'Deep Mobility (30m): Couch stretch, Figure-4 glute stretch, foam rolling'
            ]
          }
        ]
      },
      {
        day: 'Friday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Dedicated Recovery & Mobility',
            details: [
              'Full-body foam rolling',
              'Lower-body dynamic mobility',
              'Trigger point work on feet/calves',
              '20 mins targeted hamstrings/glutes decompression (Legs-Up-The-Wall)'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Aerobic Primer & Saturday Prep',
            details: [
              'Aerobic Flush (30m): Zone 2 Erg (Row or Bike) @ light effort',
              'Saturday Prep (60m): Thoracic spine mobility, ankle dorsiflexion drills, light footwork'
            ]
          }
        ]
      },
      {
        day: 'Saturday',
        sessions: [
          {
            time: 'Morning (90–120 Mins)',
            title: 'REGULAR HYROX SESSION',
            details: [
              'High-intensity hybrid session combining station practice with race-pace running',
              'Focus on executing step-in burpees and short piston steps on the Sled Push'
            ]
          }
        ]
      },
      {
        day: 'Sunday',
        sessions: [
          {
            time: 'Morning (30–45 Mins)',
            title: 'Active Recovery Zone 2 Run',
            details: [
              '30–45 Mins easy run on flat terrain',
              'Strictly conversational pace / nasal breathing (<140 bpm)',
              'Cooldown (15m): Gentle lower-body flush and dynamic stretching'
            ]
          }
        ]
      }
    ]
  },
  // Week 2-6 (Phase 1) - 使用類似結構，你可以之後自行調整細節
  {
    week: 2,
    phase: 1,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Pro Lower Strength & Burpee Efficiency', details: ['Continue Week 1 protocol with progressive overload'] }, { time: 'After Work', title: 'Threshold Running', details: ['4 x 2km intervals'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Aerobic Base Run', details: ['Zone 2 60 mins'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Pro Sled Pull & Upper Pull', details: ['Heavy sled work + SkiErg intervals'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Pro Sled Push & Erg', details: ['Sled push mechanics + Row intervals'] }, { time: 'After Work', title: 'Zone 2 Run', details: ['60 mins easy'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Recovery & Mobility', details: ['Full body work'] }, { time: 'After Work', title: 'Aerobic Primer', details: ['Light erg work'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX Session', details: ['Race simulation'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Active Recovery', details: ['30-45 mins Zone 2'] }] }
    ]
  },
  {
    week: 3,
    phase: 1,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Pro Lower Strength', details: ['Progressive overload'] }, { time: 'After Work', title: 'Threshold Run', details: ['4 x 2km'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Zone 2 Run', details: ['60 mins'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Sled Pull Power', details: ['Heavy work'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Sled Push & Erg', details: ['Power work'] }, { time: 'After Work', title: 'Zone 2', details: ['60 mins'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Recovery'] }, { time: 'After Work', title: 'Prep', details: ['Saturday prep'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX Session', details: ['High intensity'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery Run', details: ['Zone 2'] }] }
    ]
  },
  {
    week: 4,
    phase: 1,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Strength & Burpee', details: ['Week 4 progression'] }, { time: 'After Work', title: 'Threshold', details: ['4 x 2km'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Zone 2', details: ['60 mins'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Sled Pull', details: ['Power'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Sled Push', details: ['Mechanics'] }, { time: 'After Work', title: 'Zone 2', details: ['60 mins'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Recovery', details: ['Mobility'] }, { time: 'After Work', title: 'Primer', details: ['Light work'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX', details: ['Session'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Zone 2'] }] }
    ]
  },
  {
    week: 5,
    phase: 1,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Lower Strength', details: ['Heavy'] }, { time: 'After Work', title: 'Threshold', details: ['Intervals'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Zone 2', details: ['Run'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Sled Pull', details: ['Power'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Sled Push', details: ['Erg'] }, { time: 'After Work', title: 'Zone 2', details: ['Run'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Work'] }, { time: 'After Work', title: 'Prep', details: ['Saturday'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX', details: ['Session'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Run'] }] }
    ]
  },
  {
    week: 6,
    phase: 1,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Strength', details: ['Final week Phase 1'] }, { time: 'After Work', title: 'Threshold', details: ['Run'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Zone 2', details: ['Run'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Sled', details: ['Pull'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Sled', details: ['Push'] }, { time: 'After Work', title: 'Zone 2', details: ['Run'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Recovery', details: ['Mobility'] }, { time: 'After Work', title: 'Prep', details: ['Weekend'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX Test', details: ['Benchmark'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Easy'] }] }
    ]
  },

  // Phase 2: Weeks 7-10
  {
    week: 7,
    phase: 2,
    days: [
      {
        day: 'Monday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Pro Weight Power Endurance',
            details: [
              'Sandbag Lunges & Wall Balls (40m): 4 sets: 20m Sandbag Walking Lunges (30kg) + 20 Wall Balls (9kg to 10ft)',
              'Farmers Carry (20m): 4 sets x 50m Carry (2 x 32kg kettlebells/dumbbells)',
              'Cooldown (15m): Quad and shoulder stretches'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Compromised Running & Burpee Fatigue',
            details: [
              'Main Workout (60m): 5 Rounds: 800m Run @ Race Pace (4:20/km) → 15m Step-In Burpee Broad Jumps → 200m Sprint Exit',
              'Rest 2 mins between rounds',
              'Cooldown & Mobility (30m): 10m light jog + 20m glute, hamstring, and lower back release'
            ]
          }
        ]
      },
      {
        day: 'Tuesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Threshold Speed Intervals',
            details: [
              'Workout (50m): 6 x 1km Runs @ 4:10–4:15/km pace',
              'Rest 60s standing/jog recovery between sets',
              'Cooldown (25m): 10m easy jog + 15m calf and soleus static stretches'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Wednesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Strength Maintenance & Core',
            details: [
              'Heavy Maintenance (40m): Heavy Deadlifts (3 sets x 5 reps @ 80%) + Overhead Dumbbell Press (3 sets x 8 reps)',
              'Core & Grip (25m): Hanging Leg Raises + Heavy Kettlebell Suitcase Holds (3 sets)',
              'Cooldown (10m): Full body stretch'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Thursday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Easy Aerobic Flush & Upper Mobility',
            details: [
              'Run (45m): Zone 2 Recovery Run (<140 bpm)',
              'Mobility (30m): Thoracic spine, shoulder overhead extension, and ankle mobilizations'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Threshold Race-Pace Running',
            details: [
              'Main Workout (60m): 5 x 1.2km Runs @ Target Race Pace (4:20/km)',
              'Rest 90s jog',
              'Cooldown (30m): 10m light jog + 20m posterior chain stretching'
            ]
          }
        ]
      },
      {
        day: 'Friday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Dedicated Stretching & Mobility',
            details: [
              'Deep hip opener drills',
              'Hamstring lengtheners',
              'Shoulder mobility',
              'Ankle stiffness prep'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Roxzone Speed & Active Transitions',
            details: [
              'Workout (60m): 30m Light Zone 2 Run + 30m Rapid Station Exit Drills',
              'Practice completing a station and immediately accelerating into a 200m run within 10 seconds',
              'Cooldown (30m): Full static stretch'
            ]
          }
        ]
      },
      {
        day: 'Saturday',
        sessions: [
          {
            time: 'Morning (90–120 Mins)',
            title: 'REGULAR HYROX SESSION',
            details: [
              'Apply the 10-Second Roxzone Exit Rule: zero standing still when exiting stations',
              'Transition straight into a jog'
            ]
          }
        ]
      },
      {
        day: 'Sunday',
        sessions: [
          {
            time: 'Morning (30–45 Mins)',
            title: 'Active Recovery Zone 2 Run',
            details: [
              '30–45 Mins strict easy flush run (<140 bpm)',
              'Lower-body dynamic stretching'
            ]
          }
        ]
      }
    ]
  },
  {
    week: 8,
    phase: 2,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Power Endurance', details: ['Sandbag + Wall Balls'] }, { time: 'After Work', title: 'Compromised Run', details: ['5 rounds'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Speed Intervals', details: ['6 x 1km'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Strength Maintenance', details: ['Deadlifts + OHP'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Zone 2 + Mobility', details: ['Recovery'] }, { time: 'After Work', title: 'Race Pace', details: ['5 x 1.2km'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Deep work'] }, { time: 'After Work', title: 'Roxzone Drills', details: ['Transitions'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX Session', details: ['10-sec rule'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery Run', details: ['Zone 2'] }] }
    ]
  },
  {
    week: 9,
    phase: 2,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Power Endurance', details: ['Week 9'] }, { time: 'After Work', title: 'Compromised Run', details: ['Intervals'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Speed Work', details: ['Threshold'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Strength', details: ['Maintenance'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Easy Run', details: ['Zone 2'] }, { time: 'After Work', title: 'Race Pace', details: ['Intervals'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Work'] }, { time: 'After Work', title: 'Transitions', details: ['Roxzone'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX', details: ['Session'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Run'] }] }
    ]
  },
  {
    week: 10,
    phase: 2,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Power', details: ['Final Phase 2'] }, { time: 'After Work', title: 'Compromised', details: ['Run'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Speed', details: ['Intervals'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Strength', details: ['Maintain'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Recovery', details: ['Easy'] }, { time: 'After Work', title: 'Race Pace', details: ['Final test'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Deep'] }, { time: 'After Work', title: 'Transitions', details: ['Speed'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'HYROX Benchmark', details: ['Test'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Easy'] }] }
    ]
  },

  // Phase 3: Weeks 11-13
  {
    week: 11,
    phase: 3,
    days: [
      {
        day: 'Monday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Pro Maintenance Strength',
            details: [
              '3 sets x 3 reps Back Squats @ 80%',
              '3 sets x 50m Heavy Farmers Carry (32kg)',
              'Focus on speed and execution without muscular exhaustion'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Race-Pace Transition Blocks',
            details: [
              '3 Sets: 1km Run @ 4:20/km pace → 1 HYROX Station (Pro Load) → Immediate 200m exit run',
              'Rest 3 mins between sets',
              'Cooldown: 20m light stretching'
            ]
          }
        ]
      },
      {
        day: 'Tuesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Easy Zone 2 Run',
            details: [
              '45 Mins easy Zone 2 run',
              '15m light mobility'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Wednesday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Taper Mobility Routine',
            details: [
              'Light foam rolling',
              'Dynamic hip flexor and glute mobility',
              'Gentle breathing drills'
            ]
          },
          {
            time: 'After Work',
            title: 'REST / SCHOOL',
            details: []
          }
        ]
      },
      {
        day: 'Thursday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Station Efficiency Touches',
            details: [
              '3 sets x 10 Light Wall Balls (9kg)',
              '3 sets x 10m Step-In Burpee Broad Jump rhythm tuning',
              'Zero grinding'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Roxzone Priming Drills',
            details: [
              '20m light jog',
              '4 x 200m stride-outs @ race pace with rapid transition exits',
              '30m full-body static stretch'
            ]
          }
        ]
      },
      {
        day: 'Friday',
        sessions: [
          {
            time: 'Lunch (75 Mins)',
            title: 'Active Mobility & Stretching',
            details: [
              'Gentle full-body mobility work',
              'Keep legs fresh'
            ]
          },
          {
            time: 'After Work (90 Mins)',
            title: 'Pre-Race Rest & Hydration',
            details: [
              'Full rest'
            ]
          }
        ]
      },
      {
        day: 'Saturday',
        sessions: [
          {
            time: 'Morning',
            title: 'Full Race Simulation Effort',
            details: [
              'Week 11: Full Race Simulation'
            ]
          }
        ]
      },
      {
        day: 'Sunday',
        sessions: [
          {
            time: 'Morning (30 Mins)',
            title: 'Light Active Recovery',
            details: [
              '30m walk/run'
            ]
          }
        ]
      }
    ]
  },
  {
    week: 12,
    phase: 3,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Maintenance Strength', details: ['Light'] }, { time: 'After Work', title: 'Transition Blocks', details: ['Race pace'] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Zone 2', details: ['Easy'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Taper'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Efficiency', details: ['Touches'] }, { time: 'After Work', title: 'Roxzone', details: ['Priming'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Active'] }, { time: 'After Work', title: 'Rest', details: ['Hydration'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'Race Simulation', details: ['Final'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Recovery', details: ['Light'] }] }
    ]
  },
  {
    week: 13,
    phase: 3,
    days: [
      { day: 'Monday', sessions: [{ time: 'Lunch', title: 'Very Light', details: ['Shakeout'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Tuesday', sessions: [{ time: 'Lunch', title: 'Easy Move', details: ['15 mins'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Wednesday', sessions: [{ time: 'Lunch', title: 'Mobility', details: ['Gentle'] }, { time: 'After Work', title: 'REST', details: [] }] },
      { day: 'Thursday', sessions: [{ time: 'Lunch', title: 'Activation', details: ['Light'] }, { time: 'After Work', title: 'REST', details: ['Hydrate'] }] },
      { day: 'Friday', sessions: [{ time: 'Lunch', title: 'REST', details: ['Travel to Sanya'] }, { time: 'After Work', title: 'REST', details: ['Pre-Race'] }] },
      { day: 'Saturday', sessions: [{ time: 'Morning', title: 'RACE DAY — Sanya Pro Men', details: ['December 4, 2026'] }] },
      { day: 'Sunday', sessions: [{ time: 'Morning', title: 'Post-Race Recovery & Celebration', details: ['December 5, 2026'] }] }
    ]
  }
];