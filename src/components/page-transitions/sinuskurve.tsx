import React from "react";

// 1. Definition des Props-Interfaces
interface SinusKurveProps {
  /** Die Breite des SVG-Containers. */
  width: number;
  /** Die Höhe des SVG-Containers. */
  height: number;
  /** Die Amplitude der Welle (entspricht der "Stärke"). */
  strength: number;
  /** Die Anzahl der vollen Sinuszyklen über die Breite. Standard ist 1. */
  frequency?: number;
  /** Die Farbe der Linie. Standard ist "blue". */
  color?: string;
  /** Die Dicke der Linie. Standard ist 2. */
  strokeWidth?: number;
}

/**
 * Zeichnet eine Sinuskurve in einem SVG-Element basierend auf den übergebenen Props.
 */
const SinusKurve: React.FC<SinusKurveProps> = ({
  width,
  height,
  strength,
  frequency = 1,
  color = "blue",
  strokeWidth = 2,
}) => {
  // Generiert den SVG-Pfad-String (d-Attribut)
  const generatePath = (): string => {
    let pathData = `M 0 ${height / 2}`; // Starte in der Mitte links

    const numPoints = 100; // Anzahl der Punkte für die Glätte der Kurve

    for (let i = 0; i <= numPoints; i++) {
      // Berechne die x-Koordinate (von 0 bis width)
      const x: number = (i / numPoints) * width;

      // Berechne den Winkel in Radiant für die Sinusfunktion
      const angle: number = (x / width) * 2 * Math.PI * frequency;

      // Berechne die y-Koordinate: y = Mittelpunkt + sin(Winkel) * Amplitude
      const yOffset: number = Math.sin(angle) * strength;
      const y: number = height / 2 + yOffset;

      // Füge einen Linienabschnitt zum Pfad hinzu
      pathData += ` L ${x} ${y}`;
    }

    return pathData;
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Das zentrale Pfad-Element für die Sinuskurve */}
      <path
        d={generatePath()}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none" // Wichtig für eine Linie ohne Füllung
      />
      {/* Optionale Mittellinie zur Orientierung (y=0 Achse des Sinus)
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="lightgray"
        strokeWidth="1"
        strokeDasharray="5,5"
      /> */}
    </svg>
  );
};

export default SinusKurve;
