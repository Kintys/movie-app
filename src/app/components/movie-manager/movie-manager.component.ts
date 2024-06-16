import { Component } from '@angular/core';
import { movieList, Movie } from '../../dataValues/dataMovie';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-movie-manager',
  standalone: true,
  imports: [MovieCardComponent, MovieListItemComponent, CarouselModule],
  templateUrl: './movie-manager.component.html',
  styleUrl: './movie-manager.component.scss',
})
export class MovieManagerComponent {
  public movieList: Movie[] = movieList;
  public favoriteList: Movie[] | undefined = [];
  public wishList: Movie[] | undefined = [];
  public favoriteTitle: string = 'your favorite list';
  public wishListTitle: string = 'your wish list';
  public isVisible: boolean = false;
  addItemToFavoriteList(id: string) {
    this.addItemToSomeList(id, this.movieList, this.favoriteList);
  }
  addItemToWishList(id: string) {
    this.addItemToSomeList(id, this.movieList, this.wishList);
  }
  deleteItemFromFavoriteList(id: string) {
    if (this.favoriteList)
      this.favoriteList = this.favoriteList.filter(
        (item: Movie) => item.id !== id
      );
  }
  deleteItemFromWishList(id: string) {
    if (this.wishList)
      this.wishList = this.wishList.filter((item: Movie) => item.id !== id);
  }
  addItemToSomeList(
    id: string,
    movieList: Movie[],
    newArr: Movie[] | undefined
  ) {
    const foundObj = movieList.find((item: Movie) => item.id === id);
    const hasObj = newArr?.some((item: Movie) => item.id === id);
    if (foundObj && !hasObj) newArr?.push(foundObj);
    else return;
  }
  showDialog() {
    this.isVisible = true;
  }
}
