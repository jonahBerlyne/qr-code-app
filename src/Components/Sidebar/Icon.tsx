interface IconInterface {
 icon: object;
 onClick: () => void;
};

export default function Icon({ icon, onClick }: IconInterface) {
 return (
  <div className="icon" onClick={onClick}>
   {icon}
  </div>
 );
}