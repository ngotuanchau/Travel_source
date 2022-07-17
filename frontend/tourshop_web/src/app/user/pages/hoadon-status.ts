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
    name: "Bị hủy bởi doanh nghiệp (Được hoàn tiền 100%)",
    color: "color:red",
  },
  {
    id: 6,
    name: "Bị hủy bởi doanh nghiệp (Không hoàn tiền)",
    color: "color:red",
  },
  {
    id: 7,
    name: "Đã hủy (Không hoàn tiền)",
    color: "color:red",
  },
  {
    id: 8,
    name: "Đã hủy (Được hoàn tiền 80%)",
    color: "color:red",
  },
  {
    id: 9,
    name: "Đã được hoàn tiền",
    color: "color:red",
  },
];
