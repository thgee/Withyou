declare module "*.css" {
  const content: { [className: string]: string };
  const styles: { [key: string]: string };
  export = content;
}
