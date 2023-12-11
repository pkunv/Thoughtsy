export const formatDateFromDatetime = (date: string) => {
  return date.replaceAll("T", " ").substr(0, 16)
}
