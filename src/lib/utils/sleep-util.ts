export class SleepUtil {
  /*
    WARNING - great care needs to be taken when using this method.
    It's purpose is to aid in data migrations until proper backend
    services become available. When that happens, this should be removed.
  */
  public static sleep(timeMS: number) {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + timeMS);
    while ((new Date()) < endTime) { }
  }
}
