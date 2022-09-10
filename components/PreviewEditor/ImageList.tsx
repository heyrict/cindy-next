import React, { useRef, useState } from 'react';
import styled from 'theme/styled';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';
import { MAX_IMAGE_STOCK } from 'settings';

import { Box, ButtonTransparent, Flex, Img, Input } from 'components/General';

import plusPlain from 'svgs/plusPlain.svg';
import dustbin from 'svgs/dustbin.svg';

import { FormattedMessage } from 'react-intl';
import puzzlePageMessages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import { useMutation, useQuery } from '@apollo/client';
import { IMAGES_QUERY } from 'graphql/Queries/Image';
import {
  DELETE_IMAGE_MUTATION,
  UPLOAD_IMAGE_MUTATION,
} from 'graphql/Mutations/Image';

import { ImageListProps } from './types';
import {
  ImagesQuery,
  ImagesQueryVariables,
} from 'graphql/Queries/generated/ImagesQuery';
import {
  UploadImage,
  UploadImageVariables,
} from 'graphql/Mutations/generated/UploadImage';
import {
  DeleteImage,
  DeleteImageVariables,
} from 'graphql/Mutations/generated/DeleteImage';

const FileUploadBtn = ButtonTransparent.withComponent('label');

const CornerBtn = styled(ButtonTransparent)`
  position: absolute;
  background: ${p => p.theme.colors.red[2]};
  opacity: 0.8;
  border-radius: ${p => p.theme.radii[3]}px;
  top: -10px;
  right: -10px;
`;

const ImageRow = styled(Box)`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ImageList = ({ userId, onClick }: ImageListProps) => {
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const [uploading, setUploading] = useState(false);
  const { data, error } = useQuery<ImagesQuery, ImagesQueryVariables>(
    IMAGES_QUERY,
    {
      variables: {
        userId,
        puzzleNull: true,
        limit: 20,
        offset: 0,
      },
      fetchPolicy: 'network-only',
    },
  );
  const [uploadImage] = useMutation<UploadImage, UploadImageVariables>(
    UPLOAD_IMAGE_MUTATION,
    {
      update: (cache, { data }) => {
        if (!data) return;
        if (data.uploadImage === null) return;
        const newImage = data.uploadImage;
        const cachedResult = cache.readQuery<ImagesQuery, ImagesQueryVariables>(
          {
            query: IMAGES_QUERY,
            variables: {
              userId,
              puzzleNull: true,
            },
          },
        );
        if (cachedResult === null) return;
        const { images } = cachedResult;
        setUploading(false);
        cache.writeQuery({
          query: IMAGES_QUERY,
          variables: {
            userId,
            puzzleNull: true,
          },
          data: {
            images: upsertItem(images, newImage, 'created', 'desc'),
          },
        });
      },
      onError: error => {
        toast.error(`${error.name}: ${error.message}`);
        setUploading(false);
      },
    },
  );
  const images = data ? data.images : [];
  const [deleteImage] = useMutation<DeleteImage, DeleteImageVariables>(
    DELETE_IMAGE_MUTATION,
    {
      update: (cache, { data }) => {
        if (!data) return;
        if (data.deleteImage === null) return;
        const delImage = data.deleteImage;
        cache.modify({
          fields: {
            images: (prev: any[], { readField }) =>
              prev.filter(taskRef => delImage.id !== readField('id', taskRef)),
          },
        });
      },
      onError: error => {
        toast.error(`${error.name}: ${error.message}`);
      },
    },
  );

  if (error) {
    return (
      <>
        {error.name}: {error.message}
      </>
    );
  }

  return images ? (
    <React.Fragment>
      {uploading && (
        <ImageRow width={1} bg="orange.2">
          Now Uploading...
        </ImageRow>
      )}
      <ImageRow width={1} bg="orange.2">
        {images.length < MAX_IMAGE_STOCK && (
          <Box
            mx={2}
            style={{ display: 'inline-block', position: 'relative' }}
            key="add_image"
          >
            <FileUploadBtn
              htmlFor="file_upload"
              p={2}
              style={{
                display: uploading ? 'none' : 'inline-block',
              }}
            >
              <Img height="md" src={plusPlain} />
            </FileUploadBtn>
            <Input
              id="file_upload"
              type="file"
              style={{ display: 'none' }}
              onChange={({ target }) => {
                const {
                  validity,
                  files: [file],
                } = target as any;
                if (validity.valid) {
                  setUploading(true);
                  uploadImage({
                    variables: {
                      file,
                    },
                  });
                }
              }}
            />
          </Box>
        )}
        {images.map(im => {
          let imext;
          switch (im.contentType) {
            case 'image/png':
              imext = 'png';
              break;
            case 'image/tiff':
              imext = 'tiff';
              break;
            case 'image/svg+xml':
              imext = 'svg';
              break;
            case 'image/gif':
              imext = 'gif';
              break;
            default:
              imext = 'jpg';
              break;
          }
          const imsrc = `/images/${im.id}.${imext}`;
          return (
            <Box
              mx={2}
              style={{ display: 'inline-block', position: 'relative' }}
              key={im.id}
            >
              <CornerBtn
                onClick={() => {
                  if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                  notifHdlRef.current = toast.warn(
                    <Box>
                      <FormattedMessage
                        {...puzzlePageMessages.deleteImageConfirm}
                      />
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        bg="cyan.6"
                        borderRadius={2}
                      >
                        <ButtonTransparent
                          width={1}
                          color="cyan.0"
                          onClick={() => {
                            if (notifHdlRef.current)
                              toast.dismiss(notifHdlRef.current);
                            deleteImage({
                              variables: {
                                id: im.id,
                              },
                            });
                          }}
                        >
                          <FormattedMessage {...commonMessages.continue} />
                        </ButtonTransparent>
                      </Flex>
                    </Box>,
                    { autoClose: false },
                  );
                }}
              >
                <Img height="xs" src={dustbin} />
              </CornerBtn>
              <ButtonTransparent
                p={2}
                onClick={() => {
                  onClick(imsrc);
                }}
              >
                <Img height="md" src={imsrc} />
              </ButtonTransparent>
            </Box>
          );
        })}
      </ImageRow>
    </React.Fragment>
  ) : null;
};

export default ImageList;
