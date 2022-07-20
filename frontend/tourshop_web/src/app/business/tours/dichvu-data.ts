
export interface AmThuc {
  id:number,
  name: string;
  completed: boolean;
}
export interface LuuTru {
  id:number,
  name: string;
  completed: boolean;
}
export interface PhuongTien {
  id:number,
  name: string;
  completed: boolean;
}

export const lstAmThucs:AmThuc[]=[
  {id:1,name: 'Theo thực đơn', completed: false},
  {id:2,name: 'Buffet sáng', completed: false},
  {id:3,name: 'Buffet trưa', completed: false},
  {id:4,name: 'Buffet tối', completed: false},
  {id:5,name: 'Hải sản', completed: false},
  {id:6,name: 'Đặc sản địa phương', completed: false},
  {id:7,name: 'Tự túc', completed: false},
]
export const lstLuuTrus:LuuTru[]=[
  {id:1,name: 'Khách sạn 5 sao', completed: false},
  {id:2,name: 'Khách sạn 4 sao', completed: false},
  {id:3,name: 'Khách sạn 3 sao', completed: false},
  {id:4,name: 'Khách sạn bình dân', completed: false},
  {id:5,name: 'Tự túc', completed: false},
]

export const lstPhuongTiens:PhuongTien[]=[
  {id:1,name: 'Máy bay', completed: false},
  {id:2,name: 'Xe du lịch', completed: false},
  {id:3,name: 'Ô tô', completed: false},
  {id:4,name: 'Cano', completed: false},
  {id:5,name: 'Thuyền', completed: false},
  {id:6,name: 'Tự túc', completed: false},
]
