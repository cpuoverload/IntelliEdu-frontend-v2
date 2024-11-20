import dayjs from "dayjs";

export default (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");
