export default {
  pause: {
    x: 285,
    y: 100,
    text: "Pause",
    style: {
      fontSize: "64px",
      fontFamily: "Arial",
      color: "#746D69"
    }
  },
  score: {
    x: 295,
    y: 220,
    padding: {
      left: 30,
      right: 30,
      top: 15,
      bottom: 15
    },
    text: "Voir les scores",
    style: {
      fontSize: "15px",
      fontFamily: "Arial",
      color: "#000000",
      backgroundColor: "#cccc00"
    }
  },
  scoreTitle: {
    x: 320,
    y: 20,
    text: "HIGH SCORE",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#FFFFFF",
      backgroundColor: "#000000"
    }
  },
  scorePseudo: {
    x: 200,
    y: 100,
    text: "PSEUDO",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#FFCC00",
      backgroundColor: "#000000"
    }
  },
  scoreNumber: {
    x: 350,
    y: 100,
    text: "SCORE",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#0000F8",
      backgroundColor: "#000000"
    }
  },
  scoreDate: {
    x: 500,
    y: 100,
    text: "DATE",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#FE0000",
      backgroundColor: "#000000"
    }
  },
  pseudoElement: (pseudo: string, y: number): any => {
    return {
      x: 190,
      y: y,
      text: pseudo,
      style: {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#FFCC00",
        backgroundColor: "#000000"
      }
    };
  },
  scoreElement: (score: string, y: number): any => {
    return {
      x: 350,
      y: y,
      text: score,
      style: {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#0000F8",
        backgroundColor: "#000000"
      }
    };
  },
  dateElement: (date: string, y: number): any => {
    return {
      x: 480,
      y: y,
      text: date,
      style: {
        fontSize: "20px",
        fontFamily: "Arial",
        color: "#FE0000",
        backgroundColor: "#000000"
      }
    };
  }
};
