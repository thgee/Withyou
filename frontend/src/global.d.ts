declare module "*.scss" {
  const content: { [className: string]: string };
  const styles: { [key: string]: string };
  export = content;
}

declare module "react-transition-group";
