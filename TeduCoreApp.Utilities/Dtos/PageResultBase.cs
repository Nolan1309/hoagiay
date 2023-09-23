using System;
using System.Collections.Generic;
using System.Text;

namespace TeduCoreApp.Utilities.Dtos
{
    public abstract class PageResultBase
    {
        public int CurrentPage { get; set; }
        public int PageCount
        {
            get
            {
                var pagecount = (double)RowCount / PageSize;
                return (int)Math.Ceiling(pagecount);
            }
            set
            {
                CurrentPage = value;
            }
        }
        public int PageSize { get; set; }
        public int RowCount { get; set; }
        public int FirshRowOnPage
        {
            get
            {
                return (CurrentPage - 1) * PageSize + 1;
            }
        }
        public int LastRowOnPage
        {
            get
            {
                return Math.Min(CurrentPage * PageSize, RowCount);
            }
        }
    }
}
