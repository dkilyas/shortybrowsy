import {SimpleGrid, Text} from "@chakra-ui/layout";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useHistory, useParams} from "react-router";
import FolderItem from "./folderitem/FolderItem";
import BookmarkItem from "./urlitem/BookmarkItem";
import BookmarkToolbar from "./BookmarkToolbar";

export interface BookmarksListProps {
}

function BookmarksList(props: BookmarksListProps) {
  const {id} = useParams<{ id: string | undefined }>();
  const [bookmarks, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[] | null>();
  const parentId = useMemo(() => (bookmarks && bookmarks[0]) && bookmarks[0].parentId, [bookmarks]);
  let history = useHistory();

  useEffect(() => {
    if (id) {
      chrome.bookmarks.getSubTree(id, results => setBookmarks(results));
    } else {
      chrome.bookmarks?.getTree(setBookmarks);
    }
  }, [id, bookmarks]);

  let onDeleteBookmarkNode = useCallback((bookmarkId: string) => {
    chrome.bookmarks.remove(bookmarkId);
    setBookmarks(null);
  }, [setBookmarks]);

  return (
    <SimpleGrid spacingY={2} padding={2}>
      <BookmarkToolbar bookmarkId={id} parentId={parentId}/>
      {
        bookmarks && bookmarks[0].children?.map((child, index) => {
          if (child.url) {
            return <BookmarkItem bookmarkNode={child} keys={`${index + 1}`}
                                 onDeleteBookmarkNode={onDeleteBookmarkNode}/>
          } else {
            return <FolderItem folderNode={child} keys={`${index + 1}`}/>
          }
        })
      }
      <Text>{id}</Text>
    </SimpleGrid>
  )
}

export default BookmarksList;