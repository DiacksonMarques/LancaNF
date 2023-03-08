export interface Menu{
  name: string;
  icon: string;
  idMenu: string;
  route: string;
  subMenus?: Menu[];
}
