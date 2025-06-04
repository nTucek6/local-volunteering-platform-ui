export type HomePageDto = {
  id: number;
  title: string;
  imagePath: string;
  location: string;
  startDateTime: Date;
};


export type HomePageResponse = {
  [category: string]: HomePageDto[];
}
