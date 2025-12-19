import SinusKurve from "~c/page-transitions/sinuskurve";
import Link from "next/link";

function App() {
  return (
    <div className="p-8">
      <Link
        href="/"
        className="mb-8 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-bold mb-4">
        Sinuswelle mit Stärke 30 (niedrige Amplitude)
      </h2>
      <SinusKurve
        width={400}
        height={100}
        strength={30}
        frequency={3} // 3 Zyklen
        color="teal"
      />

      <h2 className="text-2xl font-bold my-4">
        Sinuswelle mit Stärke 45 (hohe Amplitude)
      </h2>
      <SinusKurve
        width={400}
        height={100}
        strength={45}
        frequency={1.5} // 1,5 Zyklen
        color="orangered"
        strokeWidth={3}
      />
    </div>
  );
}

export default App;
