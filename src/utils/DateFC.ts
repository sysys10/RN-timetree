export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};
export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const getWeek = (date: Date) => {
  const currentDate = date.getDate();
  const firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDayDate.getDay();

  return Math.ceil((currentDate + firstDay) / 7);
};
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
// 현재 날짜가 속한 주의 월요일 날짜를 반환
export const getCurrentWeekMonday = (date: Date) => {
  const day = date.getDay(); // 0(일) ~ 6(토)
  const diff = day === 0 ? -6 : 1 - day; // 일요일이면 6일을 빼고, 나머지 요일은 1에서 현재 요일을 뺌
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

export const calculateCellHeight = (currentdate: Date, Dimensions: any) => {
  const date = new Date(currentdate);
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const numberOfWeeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  // 화면 높이의 일정 비율로 설정하고, 주의 개수에 따라 조절
  const screenHeight = Dimensions.get('window').height;
  const baseHeight = screenHeight * 0.68; // 화면 높이의 68% 정도를 기본값으로

  return baseHeight / numberOfWeeks;
};
