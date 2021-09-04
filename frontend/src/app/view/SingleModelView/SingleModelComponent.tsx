import React from 'react';
import DescriptionTable, { TableRowType } from '../../components/Layout/DescriptionTable';
import { CogIcon, DownloadIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import CategoryIcon from '../../components/Utils/CategoryIcon';
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';
import ViewTagComponent from '../../components/Utils/ViewTagComponent';

interface ModelButtonProps {
  icon: JSX.Element;
  onClick?: () => void;
}

const ModelButton: React.FC<ModelButtonProps> = ({icon, children}) => {
  return (
    <button
      className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white space-x-1 px-3 py-2 rounded-md shadow-md hover:shadow-xl transition duration-100">
      {icon}
      <span className="uppercase font-semibold tracking-wide">{children}</span>
    </button>
  );
};

interface SingleModelComponentProps {
  post: {
    title: string;
    excerpt: string;
    description: string;
  };
  meta: {
    publisher: {
      id: number;
      name: string;
    };
    updated: Date;
    category: string;
    framework: string;
    format: string;
    tags: string[];
  };
}

const getTableItems = (category: string, framework: string, format: string) => {
  return [
    {
      name: 'Category',
      value: category,
    },
    {
      name: 'Framework',
      value: framework,
    },
    {
      name: 'Format',
      value: format,
    },
  ];
};

const getTagTableItem = (tags: string[]) => {
  return (
    <div className="max-w-xs space-y-1">
      {
        tags.map((tag, index) =>
          <ViewTagComponent key={index}>{tag}</ViewTagComponent>,
        )
      }
    </div>
  );
};

const SingleModelComponent: React.FC<SingleModelComponentProps> = ({post, meta}) => {

  const renderDescTable = () => {
    const table: TableRowType[] = [
      {
        name: 'Publisher',
        value: <Link to="/">
          <span className="underline hover:text-indigo-600">
            {meta.publisher.name}
          </span>
        </Link>,
      },
      {
        name: 'Updated',
        value: meta.updated.toLocaleDateString(),
      },
      ...getTableItems(meta.category, meta.framework, meta.format),
      {
        name: 'Tags',
        value: getTagTableItem(meta.tags),
      },
    ];
    return <DescriptionTable table={table}/>;
  };

  const conditionallyRenderActions = () => {
    return (
      <>
        <ModelButton icon={<DownloadIcon className="w-5 h-5"/>}>Download</ModelButton>
        <ModelButton icon={<ShoppingBagIcon className="w-5 h-5"/>}>$19.99</ModelButton>
        <ModelButton icon={<CogIcon className="w-5 h-5"/>}>Edit</ModelButton>
      </>
    );
  };

  return (
    <div className="md:p-6 h-full overflow-y-auto">
      <section className="md:flex md:justify-between px-4 py-5">
        <header className="w-full md:w-1/2">
          <div className="flex items-center text-gray-700">
            <CategoryIcon category="model"/>
            <span className="ml-1 leading-none font-semibold">
              {meta.category}
            </span>
          </div>
          <h1 className="mt-5 text-gray-700 font-semibold text-2xl">
            {post.title}
          </h1>
          <p className="mt-3 text-gray-700">
            {post.excerpt}
          </p>
        </header>

        <div className="mt-3 md:mt-0">
          {renderDescTable()}
          <div className="flex justify-start md:justify-end py-2 space-x-1">
            {conditionallyRenderActions()}
          </div>
        </div>
      </section>

      <div className="m-2 px-3 pt-2 pb-4 rounded-lg bg-white shadow-xl">
        <h1 className="mt-3 text-2xl font-semibold text-gray-700">Description</h1>
        <span className="block h-px mb-2 w-full bg-gray-300"/>
        <div>
          <MDEditor.Markdown source={post.description}/>
        </div>
      </div>

      <div className="h-12"/>
    </div>
  );
};

export default SingleModelComponent;