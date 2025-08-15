{
    "frame": {
        "width": 800,
        "height": 800,
        "cols": 5,
        "rows": 2
    },
    "animations" : {
        "Normal": {
            "frames": [0,1,2],
            "next": "Normal",
            "frequency": 3
        },
        "SwayL": {
            "frames": [1],
            "next": "SwayL",
            "frequency": 5
        },
        "SwayR": {
            "frames": [2],
            "next": "SwayR",
            "frequency": 5
        },
        "PunchStart": {
            "frames": [3,4],
            "next": "PunchEnd",
            "frequency": 3
        },
        "PunchEnd": {
            "frames": [4],
            "next": "PunchEnd",
            "frequency": 5
        },
        "PunchStart2": {
            "frames": [5,6],
            "next": "PunchEnd2",
            "frequency": 4
        },
        "PunchEnd2": {
            "frames": [6],
            "next": "PunchEnd2",
            "frequency": 5
        },
        "CrashStart": {
            "frames": [1,1,5],
            "next": "CrashEnd",
            "frequency": 2
        },
        "CrashEnd": {
            "frames": [7],
            "next": "CrashEnd",
            "frequency": 5
        },
        "Damage": {
            "frames": [6],
            "next": "Damage",
            "frequency": 5
        }

    }
}
