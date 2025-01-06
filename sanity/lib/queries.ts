import { defineQuery, groq } from "next-sanity";

export const LORE_QUERY =
  defineQuery(`*[_type == "lore" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const LORE_BY_ID_QUERY = `
  *[_type == "lore" && _id == $id][0] {
    _id,
    title,
    description,
    image,
    Content,
    _createdAt,
    category,
    author->{
      _id,
      id,
      name,
      username,
      image
    }
  }
`;



export const LORE_VIEWS_QUERY = defineQuery(`
    *[_type == "lore" && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
}
`);

export const AUTHOR_BY_ID_QUERY = `
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    username,
    image,
    bio
  }`

  export const LORES_BY_AUTHOR_QUERY = `
  *[_type == "lore" && author._ref in *[_type=="author" && id==$id]._id] | order(_createdAt desc) {
    _id,
    title,
    description,
    image,
    _createdAt,
    category,
    views,
    author->{
      _id,
      id,
      name,
      image,
      username
    }
  }
`;

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    Content
  }
}`);

export const EDITOR_PICKS_QUERY = `
  *[_type == "playlist" && slug.current == "editor-picks"][0] {
    "posts": posts[]->{
      _id,
      title,
      description,
      image,
      _createdAt,
      author->
    }
  }
`;


export const LORES_QUERY = groq`*[_type == "lore"] | order(_createdAt desc) {
  _id,
  title,
  description,
  image,
  _createdAt,
  category,
  "views": coalesce(views, 0),
  author->{
    _id,
    id,
    name,
    image,
    username
  }
}`