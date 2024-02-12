export default class TaskModel {
  constructor(
    title = "",
    subTitle = "",
    description = "",
    image = "",
    isDone = false
  ) {
    this.id = 0;
    this.title = title;
    this.subTitle = subTitle;
    this.description = description;
    this.image = image;
    this.isDone = isDone;
  }
}
