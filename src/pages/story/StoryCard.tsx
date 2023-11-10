import { Box, Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import DeleteButton from "../../components/DeleteButton";
import { on } from "events";

interface StoryCardProps {
    doc: DocumentData,
    onDeleteClick?: (storyId: string) => void
}


function StoryCard({ doc, onDeleteClick }: StoryCardProps) {
    return <Card sx={{ width: '100%', minHeight: '100%' }}>
        {
            doc.imageUrl ? (
                <Box sx={{
                    background: `linear-gradient(180deg, 
                rgba(0,0,0, 0.4), 
                rgba(0,0,0, 0.0),
                rgba(0,0,0, 0.4)), url(${doc.imageUrl});`,
                    backgroundSize: "cover",
                    height: 256,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center"

                }}>
                    <Stack height={256} justifyContent="space-between">
                        <DeleteButton
                            sx={{ alignSelf: "end", mr: 1, mt: 1 }}
                            onClick={() => {
                                if (onDeleteClick) {
                                    onDeleteClick(doc.id)
                                }
                            }} />
                        <Typography
                            variant="subtitle2"
                            color="white"
                            textAlign="center"
                            sx={{ textShadow: "2px 2px 5px #000", pt: 1, alignSelf: "start", ml: 1, mb: 1 }}>
                            {doc.title}
                        </Typography>

                    </Stack>

                </Box>
            ) : (
                <Skeleton variant="rectangular" height={256} animation="wave" />
            )
        }

        <CardContent sx={{ pt: 0.5 }}>
            {
                doc.timestamp ? (
                    <Typography
                        variant="overline"
                        fontSize={10.5}
                        color="text.secondary">
                        {doc.timestamp.toDate().toDateString()}
                    </Typography>

                ) : (
                    <Skeleton variant="text" width="80%" animation="wave" />
                )
            }


            {
                doc.content ? (
                    <Typography variant="body2" >
                        {doc.content}
                    </Typography>
                ) : (
                    <Skeleton variant="text" width="100%" animation="wave" />
                )
            }
        </CardContent>

    </Card>

}

export default StoryCard;