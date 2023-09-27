import React from "react";

const handleClick = (title) => {
  console.log(`You clicked me! ${title}`);
};

export const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Director",
    selector: "director",
    sortable: true,
    cell: (d) => (
      <a href="https://google.com" target="_blank" className="dlink">
        {d.director}
      </a>
    )
  },
  {
    name: "Genres",
    selector: "genres",
    sortable: true,
    cell: (d) => <span>{d.genres.join(", ")}</span>
  },
  {
    name: "Year",
    selector: "year",
    sortable: true
  },
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (d) => [
      <i
        key={d.title}
        onClick={handleClick.bind(this, d.title)}
        className="first fas fa-pen"
      ></i>,
      <i
        onClick={handleClick.bind(this, d.title)}
        className="fas fa-trash-alt"
      ></i>
    ]
  }
];





