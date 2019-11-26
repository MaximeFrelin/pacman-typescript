const familyFont: string = "AtariCustom";
const fontSizeScoreScene: number = 20;

export default {
  pause: {
    x: 250,
    y: 100,
    text: "Pause",
    style: {
      fontSize: "80px",
      fontFamily: familyFont,
      color: "#746D69"
    }
  },
  score: {
    x: 270,
    y: 220,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Voir les scores",
    style: {
      fontSize: "20px",
      fontFamily: familyFont,
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  unmute: {
    x: 230,
    y: 300,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Activer la musique",
    style: {
      fontSize: "20px",
      fontFamily: familyFont,
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  mute: {
    x: 205,
    y: 300,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Desactiver la musique",
    style: {
      fontSize: "20px",
      fontFamily: familyFont,
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  btnScoreRetour: {
    x: 325,
    y: 550,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Retour",
    style: {
      fontSize: "20px",
      fontFamily: familyFont,
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  scoreTitle: {
    x: 320,
    y: 20,
    text: "HIGH SCORE",
    style: {
      fontSize: fontSizeScoreScene + "px",
      fontFamily: familyFont,
      color: "#FFFFFF",
      backgroundColor: "#000000"
    }
  },
  scorePseudo: {
    x: 100,
    y: 100,
    text: "PSEUDO",
    style: {
      fontSize: fontSizeScoreScene + "px",
      fontFamily: familyFont,
      color: "#FFB851",
      backgroundColor: "#000000"
    }
  },
  scoreNumber: {
    x: 370,
    y: 100,
    text: "SCORE",
    style: {
      fontSize: fontSizeScoreScene + "px",
      fontFamily: familyFont,
      color: "#FFB851",
      backgroundColor: "#000000"
    }
  },
  scoreDate: {
    x: 620,
    y: 100,
    text: "DATE",
    style: {
      fontSize: fontSizeScoreScene + "px",
      fontFamily: familyFont,
      color: "#FFB851",
      backgroundColor: "#000000"
    }
  },
  pseudoElement: (pseudo: string, y: number, color: string): any => {
    return {
      x: 90,
      y: y,
      text: pseudo,
      style: {
        fontSize: fontSizeScoreScene + "px",
        fontFamily: familyFont,
        color: color,
        backgroundColor: "#000000"
      }
    };
  },
  scoreElement: (score: string, y: number, color: string): any => {
    return {
      x: 330,
      y: y,
      text: score,
      style: {
        fontSize: fontSizeScoreScene + "px",
        fontFamily: familyFont,
        color: color,
        backgroundColor: "#000000"
      }
    };
  },
  win: {
    x: 130,
    y: 275,
    text: "Vous avez gagne !",
    style: {
      fontSize: "40px",
      fontFamily: familyFont,
      color: "#746D69"
    }
  },
  recommencer: {
    x: 185,
    y: 350,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Recommencer une partie",
    style: {
      fontSize: "20px",
      fontFamily: familyFont,
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  currentScore: (score: number): any => {
    return {
      x: 230,
      y: 10,
      text: "Score :" + score,
      style: {
        fontSize:"10px",
        fontFamily: familyFont,
        color: "#FFFFFF",
        backgroundColor: "#000000"
      }
    };
  },
  Scoring: (score: number): any => {
    return {
      x: 275,
      y: 180,
      text: "Votre score : " + score,
      style: {
        fontSize: fontSizeScoreScene + "px",
        fontFamily: familyFont,
        color: "#FFFFFF",
        backgroundColor: "#000000"
      }
    };
  },
  dateElement: (date: string, y: number, color: string): any => {
    return {
      x: 570,
      y: y,
      text: date,
      style: {
        fontSize: fontSizeScoreScene + "px",
        fontFamily: familyFont,
        color: color,
        backgroundColor: "#000000"
      }
    };
  }
};

let colors = {
  RED: "#FE0000",
  CYAN: "#00FFFF",
  VIOLET: "#FEB8FE",
  JAUNE: "#FFCC00",
  BLUE: "#0000F8"
};

export { colors };

export function getColorArray(): any[] {
  return Object.keys(colors).map(function(key) {
    return [colors[key]];
  });
}
