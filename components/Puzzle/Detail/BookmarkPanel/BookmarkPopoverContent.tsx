import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';
import BookmarkInput from './BookmarkInput';

import { useQuery, useMutation } from '@apollo/client';
import {
  ADD_BOOKMARK_MUTATION,
  UPDATE_BOOKMARK_MUTATION,
} from 'graphql/Mutations/Bookmark';
import {
  PREVIOUS_BOOKMARK_VALUE_QUERY,
  PUZZLE_BOOKMARK_AGGREGATE_QUERY,
} from 'graphql/Queries/Bookmark';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import { BookmarkPopoverContentProps } from './types';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
} from 'graphql/Mutations/generated/AddBookmarkMutation';
import {
  PreviousBookmarkValueQuery,
  PreviousBookmarkValueQueryVariables,
} from 'graphql/Queries/generated/PreviousBookmarkValueQuery';
import {
  UpdateBookmarkMutation,
  UpdateBookmarkMutationVariables,
} from 'graphql/Mutations/generated/UpdateBookmarkMutation';
import {
  PuzzleBookmarkAggregateQuery,
  PuzzleBookmarkAggregateQueryVariables,
} from 'graphql/Queries/generated/PuzzleBookmarkAggregateQuery';

const BookmarkPopupContent = ({
  userId,
  puzzleId,
  setShow,
  buttonRef,
}: BookmarkPopoverContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<BookmarkInput>(null!);
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const { data, error, loading } = useQuery<
    PreviousBookmarkValueQuery,
    PreviousBookmarkValueQueryVariables
  >(PREVIOUS_BOOKMARK_VALUE_QUERY, {
    variables: {
      puzzleId,
      userId,
    },
  });
  const [addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(ADD_BOOKMARK_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createBookmark) return;
      const newBookmark = data.createBookmark;

      // Update user's bookmarks on this puzzle
      proxy.writeQuery<
        PreviousBookmarkValueQuery,
        PreviousBookmarkValueQueryVariables
      >({
        query: PREVIOUS_BOOKMARK_VALUE_QUERY,
        variables: {
          puzzleId,
          userId: userId as number,
        },
        data: {
          bookmarks: [newBookmark],
        },
      });

      // Update aggrevated bookmark count on this puzzle
      let prevData = proxy.readQuery<
        PuzzleBookmarkAggregateQuery,
        PuzzleBookmarkAggregateQueryVariables
      >({
        query: PUZZLE_BOOKMARK_AGGREGATE_QUERY,
        variables: { puzzleId },
      });
      if (prevData) {
        proxy.writeQuery<
          PuzzleBookmarkAggregateQuery,
          PuzzleBookmarkAggregateQueryVariables
        >({
          query: PUZZLE_BOOKMARK_AGGREGATE_QUERY,
          variables: { puzzleId },
          data: {
            ...prevData,
            bookmarkCount: prevData.bookmarkCount + 1,
          },
        });
      }
    },
    onCompleted: () => {
      if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
      toast.info(<FormattedMessage {...commonMessages.saved} />);
    },
    onError: error => {
      if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
      toast.error(`${error.name}: ${error.message}`);
    },
  });
  const [updateBookmark] = useMutation<
    UpdateBookmarkMutation,
    UpdateBookmarkMutationVariables
  >(UPDATE_BOOKMARK_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.updateBookmark) return;
      const newBookmark = data.updateBookmark;
      proxy.writeQuery<
        PreviousBookmarkValueQuery,
        PreviousBookmarkValueQueryVariables
      >({
        query: PREVIOUS_BOOKMARK_VALUE_QUERY,
        variables: {
          puzzleId,
          userId: userId as number,
        },
        data: {
          bookmarks: [newBookmark],
        },
      });
    },
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node | null) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node | null)
      ) {
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.bookmarks) {
    if (loading) return <Loading centered />;
    return null;
  }

  const initialValue =
    data.bookmarks.length === 0 ? 0 : data.bookmarks[0].value;

  return (
    <Flex ref={contentRef} width={1} flexWrap="wrap">
      <Box width={1} pr={1}>
        {initialValue === 0 ? (
          <FormattedMessage {...puzzleMessages.addBookmarks} />
        ) : (
          <FormattedMessage {...puzzleMessages.yourBookmarks} />
        )}
      </Box>
      <BookmarkInput ref={inputRef} initialValue={initialValue} />
      <Box width={1} bg="orange.5">
        <ButtonTransparent
          width={1}
          onClick={() => {
            if (!inputRef.current) return;
            const value = inputRef.current.state.value;

            if (data.bookmarks.length === 0) {
              // Add a bookmark if there is no bookmark before
              addBookmark({
                variables: {
                  puzzleId,
                  value,
                },
                optimisticResponse: {
                  createBookmark: {
                    __typename: 'Bookmark',
                    id: -1,
                    value,
                  },
                },
              });
            } else {
              const prevBookmark = data.bookmarks[0];

              updateBookmark({
                variables: {
                  id: prevBookmark.id,
                  value,
                },
                optimisticResponse: {
                  updateBookmark: {
                    __typename: 'Bookmark',
                    id: prevBookmark.id,
                    value,
                  },
                },
              });
            }

            notifHdlRef.current = toast.info(
              <FormattedMessage {...commonMessages.saving} />,
            );
          }}
        >
          <FormattedMessage {...commonMessages.save} />
        </ButtonTransparent>
      </Box>
    </Flex>
  );
};

export default BookmarkPopupContent;
