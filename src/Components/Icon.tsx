interface IconInterface {
 color: string;
 icon: object;
 onClick: () => void;
 title: string;
 testId?: string;
};

export default function Icon({ color, icon, onClick, title, testId }: IconInterface) {
 return (
  <div data-testid={testId} className="icon-container" onClick={onClick}>
   <span style={{ color }} className="icon">{icon}</span>
   <span style={{ color }} className="icon-title">{title}</span>
  </div>
 );
}