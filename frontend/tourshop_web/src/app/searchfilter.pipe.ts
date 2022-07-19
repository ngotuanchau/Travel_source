import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchfilter",
})
export class SearchfilterPipe implements PipeTransform {
  transform(list: any[], value: string) {
    return value ? list.filter((item) => item.ten === value) : list;
  }
}
