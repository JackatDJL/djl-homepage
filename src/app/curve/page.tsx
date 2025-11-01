import SinusKurve from "~c/page-transitions/sinuskurve";

function App() {
  return (
    <div>
      <h2>Sinuswelle mit Stärke 30 (niedrige Amplitude)</h2>
      <SinusKurve
        width={400}
        height={100}
        strength={30}
        frequency={3} // 3 Zyklen
        color="teal"
      />

      <h2>Sinuswelle mit Stärke 45 (hohe Amplitude)</h2>
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
