import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchLocations } from '../features/locationsSlice';
import { fetchAssets } from '../features/assetsSlice';
import TreeNode from './TreeNode';
import ComponentDetails from './ComponentDetails';

const TreeView = ({ companyId }) => {
    const dispatch = useDispatch();
    const locations = useSelector(state => state.locations.locations);
    const assets = useSelector(state => state.assets.assets);
    const locationsStatus = useSelector(state => state.locations.status);
    const assetsStatus = useSelector(state => state.assets.status);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const fetchInitiated = useRef(false);

    useEffect(() => {
        if (!fetchInitiated.current && companyId) {
            dispatch(fetchLocations(companyId));
            dispatch(fetchAssets(companyId));
            fetchInitiated.current = true;
        }
    }, [companyId, dispatch]);

    const handleSelectComponent = component => {
        setSelectedComponent(component);
    };

    const buildTree = (locations, assets) => {
        const nodeMap = new Map();

        // Prepare all nodes (locations and assets)
        [...locations, ...assets].forEach(item => {
            const nodeType = item.sensorType ? 'component' : (item.locationId || item.parentId ? 'asset' : 'location');
            const node = { ...item, children: [], type: nodeType };
            nodeMap.set(item.id, node);
        });

        // Link nodes to their parents
        [...locations, ...assets].forEach(item => {
            const parent = nodeMap.get(item.parentId || item.locationId);
            if (parent) {
                parent.children.push(nodeMap.get(item.id));
            }
        });

        // Filter nodes based on search term
        const filterNodes = node => {
            node.children = node.children.map(child => filterNodes(child)).filter(child => child !== null);
            const matchesSearchTerm = node.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSensorType = node.type === 'component' && node.sensorType && node.sensorType.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearchTerm || matchesSensorType || node.children.length > 0 ? node : null;
        };

        // Return only the filtered nodes if search is active, otherwise all top nodes
        if (searchTerm) {
            return Array.from(nodeMap.values()).map(node => filterNodes(node)).filter(node => node !== null);
        } else {
            return Array.from(nodeMap.values()).filter(node => !node.parentId && !node.locationId);
        }
    };

    const treeData = buildTree(locations, assets);

    return (
        <Grid container sx={{ px: 2 }}>
            <Grid item xs={12} sm={4} md={4} lg={4} sx={{
                border: '1px solid lightgrey', height: '81vh', overflowY: 'auto',
                '&::-webkit-scrollbar': { width: '4px', backgroundColor: 'transparent' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: 'lightgray', borderRadius: '2px' }
            }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => console.log('Search:', searchTerm)} edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { '& .MuiOutlinedInput-notchedOutline': { borderRadius: 0 } }
                    }}
                />
                {locationsStatus === 'loading' || assetsStatus === 'loading' ? (
                    <CircularProgress />
                ) : (
                    treeData.map(node => <TreeNode key={node.id} node={node} depth={0} onSelectComponent={handleSelectComponent} />)
                )}
            </Grid>
            {selectedComponent && (
                <ComponentDetails component={selectedComponent} />
            )}
        </Grid>
    );
};

export default TreeView;
