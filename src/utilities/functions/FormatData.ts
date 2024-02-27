export default function formatarData(dataString: string) {
  const data = new Date(dataString);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const time = data.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dataatual = new Date();
  if (dataatual.getHours() === data.getHours() && dataatual.getDate() === day) {
    const min = dataatual.getMinutes() - data.getMinutes();
    if (min === 0) {
      if (dataatual.getSeconds() - data.getSeconds() < 40) return 'Agora'
      return `${dataatual.getSeconds() - data.getSeconds()} Segundos`;
    }
    return `Há ${min} minuto${min > 1 ? "s" : ""}`;
  } else if (dataatual.getDate() === day) {
    const hours = dataatual.getHours() - data.getHours();
    return `Há ${hours} hora${hours > 1 ? "s" : ""}`;
  } else if (dataatual.getMonth() === data.getMonth()) {
    const _day = dataatual.getDate() - data.getDate();
    return `${_day} Dia atrás`;
  }
  return `${day}/${month}, ${time}`;
}
