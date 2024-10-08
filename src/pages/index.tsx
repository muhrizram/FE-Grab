import { MenuProvider } from "../providers/MenuProvider";
import MenuApp from "./menu";

export default function Menu() {
  return (
    <MenuProvider>
      <MenuApp />
    </MenuProvider>
  );
}
