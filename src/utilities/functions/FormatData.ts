export default function formatarData(dataString: string) {
  const data = new Date(dataString);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const horario = data.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dataatual = new Date();
  if (dataatual.getHours() === data.getHours() && dataatual.getDate() === dia) {
    const min = dataatual.getMinutes() - data.getMinutes();
    if (min === 0) {
      return `${dataatual.getSeconds() - data.getSeconds()} Segundos`;
    }
    return `Há ${min} minuto${min > 1 ? "s" : ""}`;
  } else if (dataatual.getDate() === dia) {
    const hours = dataatual.getHours() - data.getHours();
    return `Há ${hours} hora${hours > 1 ? "s" : ""}`;
  } else if (dataatual.getMonth() === data.getMonth()) {
    const day = dataatual.getDate() - data.getDate();
    return `${day} Dia atrás`;
  }
  return `${dia}/${mes}, ${horario}`;
}
