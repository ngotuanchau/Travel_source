export interface Status {
  id: number;
  name: string;
  color: string;
}
export const lstStatus: Status[] = [
  {
    id: 1,
    name: "Chưa xác nhận",
    color: "color:black",
  },
  {
    id: 2,
    name: "Đã xác nhận",
    color: "color:green",
  },
  {
    id: 3,
    name: "Đã thanh toán",
    color: "color:blue",
  },
  {
    id: 4,
    name: "Đã kết thúc",
    color: "color:gray",
  },
  {
    id: 5,
    name: "Bị hủy",
    color: "color:red",
  },
];
