interface IconInterface {
 icon: object;
 onClick: () => void;
 testId?: string;
};

export default function Icon({ icon, onClick, testId }: IconInterface) {
 return (
  <div data-testid={testId} className="icon" onClick={onClick}>
   {icon}
  </div>
 );
}