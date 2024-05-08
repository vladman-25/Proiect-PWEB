import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, InputBase } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useBookTableController } from "./BookTable.controller";
import { BookDTO } from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { BookAddDialog } from "../../Dialogs/BookAddDialog";
import { BookUpdateDialog } from "../../Dialogs/BookUpdateDialog";
import { useAppSelector } from "@application/store";
import SearchIcon from '@mui/icons-material/Search';
import { ConfirmDeleteModal } from "../../ConfirmDeleteModal";
/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof BookDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "id", name: "id" },
        { key: "title", name: "title" },
        { key: "description", name: "description" },
        { key: "year", name: "year" },
        { key: "price", name: "price" },
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: BookDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

/**
 * Creates the user table.
 */
export const BookTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, handleSearch, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useBookTableController(); // Use the controller hook.
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 'auto', marginBottom: '30px' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <BookAddDialog /> {/* Add the button to open the user add modal. */}
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {entry.id !== ownUserId && <ConfirmDeleteModal onClickAfter={() => remove(entry.id || '')} />}
                                {entry.id !== ownUserId && <BookUpdateDialog {...entry}/>}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}