class Misc {
  async logger(log: string, dt: boolean): Promise<string> {
    dt = true;
    console.log((dt ? "<" + await this.getDateTime() + "> " : "") + log);
    return (dt ? "<" + (await this.getDateTime()) + "> " : "") + log;
  }
  async getDateTime(): Promise<string> {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    return dateTime;
  }
}

export default new Misc();
