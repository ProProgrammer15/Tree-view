import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import locationIcon from '../assets/location.png';
import assetIcon from '../assets/asset.png';
import componentIcon from '../assets/component.png';

const TreeNode = React.memo(({ node, depth = 0, onSelectComponent }) => {
    const icon = node.type === 'location' ? locationIcon :
        node.type === 'component' ? componentIcon : assetIcon;

    return (
        <Box sx={{ paddingLeft: `${depth}em` }}>
            <Accordion sx={{ background: 'none', boxShadow: 'none', '&::before': { display: 'none' }, '&.Mui-expanded': { margin: '0 !important' } }}>
                <AccordionSummary
                    expandIcon={node.type !== 'component' ? <ExpandMoreIcon /> : null}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => node.type === 'component' && onSelectComponent(node)}
                    sx={{ minHeight: '32px', '& .MuiAccordionSummary-content': { margin: '0', alignItems: 'center' }, flexDirection: 'row-reverse' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar variant="square" src={icon} sx={{ width: 20, height: 20 }} />
                        <Typography>{node.name}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, flexDirection: 'column' }}>
                    {/* {node.children.map(child => (
                        <TreeNode key={child.id} node={child} depth={depth + 1} onSelectComponent={onSelectComponent} />
                    ))} */}
                    {node.children?.length > 0 ? (
                        node.children.map(child => (
                            <TreeNode key={child.id} node={child} depth={depth + 1} onSelectComponent={onSelectComponent} />
                        ))
                    ) : (
                        <Typography sx={{ paddingLeft: 10, color: "grey" }}>{node.type !== 'component' ? "No further details" : null}</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
});

export default TreeNode;

