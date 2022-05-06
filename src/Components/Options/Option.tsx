interface OptionInterface {
 icon: object;
 name: string;
 onClick: () => void;
};

export default function Option({ icon, name, onClick }: OptionInterface) {
 return (
  <div className="option" onClick={onClick}>
   {icon}
   <p>{name}</p>
  </div>
 );
}