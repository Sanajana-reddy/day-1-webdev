import React from 'react'
import Service from '../../utils/http';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Container, Stack, Text, Button, Group, Loader, Center, Card, Badge } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../redux/slices/User';

export default function ProfilePage() {
    const service = new Service();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await service.get('users/me');
            setUser(response.data);
        } catch (error) {            
            console.error('Error fetching user:', error);
            setError('Failed to load user profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    if (loading) {
        return (
            <Container size="sm" py="xl">
                <Center h={300}>
                    <Loader />
                </Center>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="sm" py="xl">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text c="red">{error}</Text>
                    <Button mt="md" onClick={fetchUser}>Retry</Button>
                </Card>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container size="sm" py="xl">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text c="red">User not found</Text>
                </Card>
            </Container>
        );
    }

    return (
        <Container size="sm" py="xl">
            <Card shadow="lg" padding="xl" radius="md" withBorder>
                <Stack align="center" spacing="md">
                    <Avatar src={user.avatar} size={120} radius={120} alt={user.name} />
                    <Stack spacing="xs" align="center">
                        <Text size="lg" fw={700}>{user.name}</Text>
                        <Text size="sm" c="dimmed">{user.email}</Text>
                        <Group>
                            <Badge size="lg" variant="light" color="blue">Role: {user.role}</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Member since {new Date(user.createdAt).toLocaleDateString()}
                        </Text>
                    </Stack>
                    <Group mt="lg">
                        <Button onClick={handleLogout} color="red" variant="filled">
                            Logout
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Container>
    );
}


