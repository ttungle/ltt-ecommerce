import { BreadcrumbData } from '@/models';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { useMemo } from 'react';

export interface BreadcrumbProps {
  breadcrumb: BreadcrumbData;
}

export function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  const breadcrumbLength = useMemo(() => breadcrumb?.breadcrumbItem?.length ?? 0, [breadcrumb]);
  const breadcrumbList = useMemo(() => {
    if (breadcrumbLength === 1) {
      return breadcrumb.breadcrumbItem;
    } else if (breadcrumbLength > 1) {
      const newArr = [...breadcrumb?.breadcrumbItem];
      newArr.pop();
      return newArr;
    } else {
      return [];
    }
  }, [breadcrumb, breadcrumbLength]);

  return (
    <>
      {breadcrumbLength !== 0 && (
        <Breadcrumbs sx={{ fontSize: '0.875rem', my: 3 }}>
          {breadcrumbList.map((item) => (
            <Link key={item.id} color='inherit' href={item.path}>
              {item.title}
            </Link>
          ))}

          {breadcrumbLength > 1 && (
            <Typography color='text.primary' fontSize='0.875rem'>
              {breadcrumb.breadcrumbItem[breadcrumbLength - 1].title}
            </Typography>
          )}
        </Breadcrumbs>
      )}
    </>
  );
}
