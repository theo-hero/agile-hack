import Timeline from "../components/Timeline";

function Sprint() {

    return (
      <main>
        <h1>
          Данные по спринту
        </h1>
        <Timeline min={0} max={16} step={1} value={8}/>
      </main>
    )
  }
  
  export default Sprint;