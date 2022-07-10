export interface Status {
  id: number;
  name: string;
}
export const lstStatus: Status[] = [
  {
    id: 1,
    name: "Chưa xác nhận",
  },
  {
    id: 2,
    name: "Đã xác nhận",
  },
  {
    id: 3,
    name: "Đã thanh toán",
  },
  {
    id: 4,
    name: "Đã kết thúc",
  },
  {
    id: 5,
    name: "Bị hủy",
  },
];
