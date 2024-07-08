import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Gutter } from '@/components/Gutter'
import RichText from '@/components/RichText'
import { ArchiveBlockProps } from './types'

import './style.css';

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    selectedDocs,
    categories,
  } = props

  return (
    <div id={`block-${id}`} className="archiveBlock">
      {introContent && (
        <Gutter className="introContent">
          <RichText content={introContent} />
        </Gutter>
      )}
      <CollectionArchive
        populateBy={populateBy}
        relationTo={relationTo}
        populatedDocs={populatedDocs}
        populatedDocsTotal={populatedDocsTotal}
        selectedDocs={selectedDocs}
        categories={categories}
        limit={limit}
        sort="-publishedOn"
      />
    </div>
  )
}
