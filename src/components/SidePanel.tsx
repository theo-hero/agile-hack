interface SidePanelProps {
    options: string[];
    setDataPart: (index: number) => void;
  }
  
  const SidePanel: React.FC<SidePanelProps> = ({ options, setDataPart }) => {
    return (
      <div className="side-panel">
        {options.map((option, i) => (
          <div
            key={i} 
            className="panel-link"
            onClick={() => setDataPart(i)} 
          >
            {option}
          </div>
        ))}
      </div>
    );
  };
  
  export default SidePanel;
  