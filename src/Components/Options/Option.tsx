interface OptionInterface {
 icon: object;
 name: string;
 onClick: () => void;
};

export default function Option({ icon, name, onClick }: OptionInterface) {
 return (
  <div onClick={onClick}>
   {icon}
   <p>{name}</p>
  </div>
 );
}